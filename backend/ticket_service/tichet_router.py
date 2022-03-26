from fastapi import APIRouter
from fastapi.responses import JSONResponse
from typing import List
from model import get_all_tichete_with_filters, get_tichet_by_idTichet, delete_tichet_by_idTichet, insert_tichet, update_tichet
from utils import GenericSuccess, get_error_body, TICHET_NOT_FOUND_BODY, GENERIC_SUCCESS_STATUS_BODY, CREATE_GENERIC_SUCCESS_STATUS_BODY
from view import Error, Tichet, TichetPost

router = APIRouter()


@router.get("/api/tichete/",
            responses={200: {"model": List[Tichet]},
                       500: {"model": Error}},
            response_model=List[Tichet],
            tags=["tichete"])
def get_tichete(page: int = 1, items_per_page: int = 15):
    """
    Method that handles a generic GET request for all the existent tichete.
    """
    tichet_list = []

    db_response = get_all_tichete_with_filters()

    if db_response.error:
        status_code = 500
        response_body = get_error_body(status_code, str(db_response.error), "EXCEPTION")
    else:
        status_code = 200
        for tichet in db_response.payload:
            tichet_list.append(Tichet.from_orm(tichet).dict())
        response_body = tichet_list[(page - 1) * items_per_page:page * items_per_page]

    return JSONResponse(status_code=status_code, content=response_body)


@router.get("/api/tichete/{idTichet}",
            responses={200: {"model": Tichet},
                       404: {"model": Error},
                       500: {"model": Error}},
            response_model=Tichet,
            tags=["tichete"])
def get_tichet(idTichet: str):
    """
    Method that handles a GET request for a tichete by the 'idTichet' field.
    """
    db_response = get_tichet_by_idTichet(str(idTichet))

    if db_response.error:
        status_code = 500
        response_body = get_error_body(status_code, str(db_response.error), "EXCEPTION")
    elif not db_response.completed_operation:
        status_code = 404
        response_body = TICHET_NOT_FOUND_BODY
    else:
        status_code = 200
        response_body = Tichet.from_orm(db_response.payload).dict()

    return JSONResponse(status_code=status_code, content=response_body)


@router.delete("/api/tichete/{idTichet}",
               response_model=GenericSuccess,
               responses={500: {"model": Error},
                          404: {"model": Error},
                          200: {"model": GenericSuccess}},
               tags=["tichete"])
def delete_tichet(idTichet: str):
    """
    Method that handles a DELETE request for a tichete by the 'idTichet' field.
    """
    db_response = delete_tichet_by_idTichet(str(idTichet))

    if db_response.error:
        status_code = 500
        response_body = get_error_body(status_code, str(db_response.error), "EXCEPTION")
    elif not db_response.completed_operation:
        status_code = 404
        response_body = TICHET_NOT_FOUND_BODY
    else:
        status_code = 200
        response_body = GENERIC_SUCCESS_STATUS_BODY

    return JSONResponse(status_code=status_code, content=response_body)


@router.post("/api/tichete/",
             responses={201: {"model": GenericSuccess},
                        500: {"model": Error}},
             response_model=GenericSuccess,
             tags=["tichete"])
def post_tichet(tichet: TichetPost):
    """
    Method that handles a POST request for a tichet.
    """

    tichet_dict = tichet.dict()

    db_response = insert_tichet(**tichet_dict)

    if db_response.error:
        status_code = 500
        response_body = get_error_body(status_code, str(db_response.error), "EXCEPTION")
    else:
        status_code = 201
        response_body = CREATE_GENERIC_SUCCESS_STATUS_BODY

    return JSONResponse(status_code=status_code, content=response_body)


@router.put("/api/tichete/{idTichet}",
            responses={200: {"model": GenericSuccess},
                       201: {"model": GenericSuccess},
                       500: {"model": Error},
                       406: {"model": Error}},
            response_model=GenericSuccess,
            tags=["tichete"])
def put_tichet(idTichet: str, tichet: Tichet):
    """
    Method that handles a PUT request for a(n) tichet by its 'idTichet' field.
    Creates the tichet if it doesn't already exist.
    """
    request_body = tichet.dict()
    del request_body["links"]

    db_response = update_tichet(idTichet, request_body)

    if db_response.error:
        status_code = 500
        response_body = get_error_body(status_code, str(db_response.error), "EXCEPTION")
    elif db_response.completed_operation is False:
        db_response = insert_tichet(**request_body)

        if db_response.error:
            status_code = 500
            response_body = get_error_body(status_code, str(db_response.error), "EXCEPTION")
        else:
            status_code = 201
            response_body = CREATE_GENERIC_SUCCESS_STATUS_BODY
    else:
        status_code = 200
        response_body = GENERIC_SUCCESS_STATUS_BODY

    return JSONResponse(status_code=status_code, content=response_body)
