from flask import (
    Blueprint, request
)

bp = Blueprint('webhook', __name__, url_prefix='/webhook')


@bp.route('/', methods=('GET', 'POST'))
def line_webhook():
    return request.headers.__str__()
