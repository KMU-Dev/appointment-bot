import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, sessions, url_for, jsonify
)
from werkzeug.security import check_password_hash, generate_password_hash

bp = Blueprint('webhook', __name__, url_prefix='/webhook')


@bp.route('/', methods=('GET', 'POST'))
def line_webhook():
    return request.headers.__str__()
