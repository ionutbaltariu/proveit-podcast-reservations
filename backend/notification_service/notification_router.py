from fastapi import APIRouter
from fastapi.responses import JSONResponse
from typing import List
from model import get_all_notificari_with_filters, get_notificare_by_idNotificare, insert_tichet
from utils import GenericSuccess, get_error_body, NOTIFICATION_NOT_FOUND_BODY, GENERIC_SUCCESS_STATUS_BODY, CREATE_GENERIC_SUCCESS_STATUS_BODY
from view import Error, Notificare, NotificarePost

router = APIRouter()


@router.get("/api/notificari/",
            responses={200: {"model": List[Notificare]},
                       500: {"model": Error}},
            response_model=List[Notificare],
            tags=["notificari"])
def get_notificari(page: int = 1, items_per_page: int = 15):
    """
    Method that handles a generic GET request for all the existent notificari.
    """
    notificari_list = []

    db_response = get_all_notificari_with_filters()

    if db_response.error:
        status_code = 500
        response_body = get_error_body(status_code, str(db_response.error), "EXCEPTION")
    else:
        status_code = 200
        for notificare in db_response.payload:
            notif_dict = Notificare.from_orm(notificare).dict()
            notif_dict['timestamp'] = str(notif_dict['timestamp'])
            notificari_list.append(notif_dict)
        response_body = notificari_list[(page - 1) * items_per_page:page * items_per_page]

    return JSONResponse(status_code=status_code, content=response_body)


@router.get("/api/notificari/{idNotificare}",
            responses={200: {"model": Notificare},
                       404: {"model": Error},
                       500: {"model": Error}},
            response_model=Notificare,
            tags=["notificari"])
def get_notificare(idNotificare: str):
    """
    Method that handles a GET request for a notificare by the 'idNotificare' field.
    """
    db_response = get_notificare_by_idNotificare(str(idNotificare))

    if db_response.error:
        status_code = 500
        response_body = get_error_body(status_code, str(db_response.error), "EXCEPTION")
    elif not db_response.completed_operation:
        status_code = 404
        response_body = NOTIFICATION_NOT_FOUND_BODY
    else:
        status_code = 200
        response_body = Notificare.from_orm(db_response.payload).dict()
        response_body['timestamp'] = str(response_body['timestamp'])

    return JSONResponse(status_code=status_code, content=response_body)


@router.post("/api/notificari/",
             responses={201: {"model": GenericSuccess},
                        500: {"model": Error}},
             response_model=GenericSuccess,
             tags=["notificari"])
def post_tichet(tichet: NotificarePost):
    """
    Method that handles a POST request for a notificare.
    """

    notificare_dict = tichet.dict()

    db_response = insert_tichet(**notificare_dict)

    if db_response.error:
        status_code = 500
        response_body = get_error_body(status_code, str(db_response.error), "EXCEPTION")
    else:
        status_code = 201
        response_body = CREATE_GENERIC_SUCCESS_STATUS_BODY

    return JSONResponse(status_code=status_code, content=response_body)



