from flask import Blueprint, redirect, request
from app.models import User, Game, Review, db
from flask_login import current_user, login_required
from flask_wtf.csrf import CSRFProtect, generate_csrf
from ..forms.game_form import GameForm


game_routes = Blueprint('games', __name__)


# * -----------  GET  --------------
# Returns all games that are listed on the landing page(store) for purchase

@game_routes.route('')
def get_all_games():
    games = Game.query.all()
    return ([game.to_dict_simple() for game in games])



# * -----------  GET  --------------
# Returns all details of a single game

@game_routes.route('/<int:game_id>')
def get_single_game(game_id):
    game = Game.query.get(game_id)
    return game.to_dict()


#TODO -----------  POST  --------------

@game_routes.route('/create_game', methods=['POST'])
@login_required
def create_game():
    form = GameForm()
    form.csrf_token.data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_game = Game(
            title=form.title.data,
            image=form.image.data,
            price=form.price.data,
            release_date=form.release_date.data,
            short_description=form.short_description.data,
            full_description=form.full_description.data,
            developer=form.developer.data,
            publisher=form.publisher.data,
            banner_image=form.banner_image.data,
            other_images=form.other_images.data
        )

        db.session.add(new_game)
        db.session.commit()

        return new_game.to_dict()
    else:
        return {"errors": form.errors}, 400
