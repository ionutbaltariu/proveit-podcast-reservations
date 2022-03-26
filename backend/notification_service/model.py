from Notificare import Notificare
from db import Session, engine


class OperationResponseWrapper:
    def __init__(self, payload=None, error=None, completed_operation=True):
        self.payload = payload
        self.error = error
        self.completed_operation = completed_operation


def get_all_entities(entity, **kwargs):
    """
    Wrapper for a generic ORM call that is retrieving all instances of
    any entity also using some filter parameters.
    :param entity: the type of the entity that is to be retrieved
    :param kwargs: the parameters by which the filters will be made
    """
    with Session(bind=engine) as session:
        response = OperationResponseWrapper()

        try:
            response.payload = session.query(entity).filter_by(**kwargs).all()
            response.completed_operation = True
        except Exception as e:
            session.rollback()
            response.error = e
            response.completed_operation = False

        return response


def get_entity_by_identifier(entity, identifier_name, identifier_value):
    """
    Wrapper for a generic ORM call that is retrieving an Entity by an identifier.
    :param entity: the type of the entity that is to be retrieved
    :param identifier_name: the column/field by which the identifier will be searched
    :param identifier_value: the value of the identifier column
    """
    with Session(bind=engine) as session:
        response = OperationResponseWrapper()

        try:
            response.payload = session \
                .query(entity) \
                .filter(getattr(entity, identifier_name) == identifier_value) \
                .first()
            if not response.payload:
                response.completed_operation = False
            else:
                response.completed_operation = True
        except Exception as e:
            session.rollback()
            response.error = e
            response.completed_operation = False

        return response


def delete_entity_by_identifier(entity, identifier_name, identifier_value):
    """
    Wrapper for a generic ORM call that is deleting an Entity by an identifier.
    :param entity: the type of the entity that is to be deleted
    :param identifier_name: the column/field by which the identifier will be searched and deleted
    :param identifier_value: the value of the identifier column
    """
    with Session(bind=engine) as session:
        response = OperationResponseWrapper()

        try:
            entity_to_delete = session \
                .query(entity) \
                .filter(getattr(entity, identifier_name) == identifier_value) \
                .first()

            if entity_to_delete:
                session.delete(entity_to_delete)
                session.commit()
            else:
                response.completed_operation = False

        except Exception as e:
            session.rollback()
            response.completed_operation = False
            response.error = e

        return response


def update_entity_by_identifier(entity, identifier_name, identifier_value, updated_entity_fields):
    """
    Wrapper for a generic ORM call that is updating an Entity by an identifier.
    :param entity: the type of the entity that is to be updated
    :param identifier_name: the column/field by which the identifier will be searched
    :param identifier_value: the value of the identifier column
    :param updated_entity_fields: a dictionary that contains the new values of the entity
    """
    with Session(bind=engine) as session:
        response = OperationResponseWrapper()

        try:
            entity_to_update = session \
                .query(entity) \
                .filter(getattr(entity, identifier_name) == identifier_value) \
                .first()

            if entity_to_update:
                for field in updated_entity_fields:
                    setattr(entity_to_update, field, updated_entity_fields[field])

                session.add(entity_to_update)
                session.commit()
                response.completed_operation = True
                response.payload = entity_to_update
            else:
                response.completed_operation = False
        except Exception as e:
            session.rollback()
            response.completed_operation = False
            response.error = e

        return response


def insert_entity(entity, **kwargs):
    """
    Wrapper for an ORM call that inserts a book into the database.
    :param entity: the type of the entity
    :param kwargs: the attributes of the entity
    """
    with Session(bind=engine) as session:
        response = OperationResponseWrapper()

        entity_to_insert = entity(**kwargs)
        try:
            session.add(entity_to_insert)
            session.commit()
            response.completed_operation = True
            response.payload = entity_to_insert
        except Exception as e:
            session.rollback()
            response.completed_operation = False
            response.error = e

        return response


def get_notificare_by_idNotificare(idNotificare):
    """
    Wrapper for an ORM call that is retrieving a(n) entity by its idTichet.
    :param idNotificare: TODO
    """
    return get_entity_by_identifier(Notificare, "idNotificare", idNotificare)


def get_all_notificari_with_filters(**kwargs):
    """
    Wrapper for an ORM call that is retrieving all notificari by idNotificare
    :param kwargs: the parameters by which the filters will be made
    """
    return get_all_entities(Notificare, **kwargs)


def insert_tichet(**kwargs):
    """
    Wrapper for an ORM call that is creating a(n) notificare.
    :param kwargs: the attributes of the Notificare that is to be created
    """
    return insert_entity(Notificare, **kwargs)
