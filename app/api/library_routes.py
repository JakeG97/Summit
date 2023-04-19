from flask import Blueprint, jsonify, request
from app.models import User, Game, CartGame, LibraryGame, db
from flask_login import current_user, login_required
from ..forms.library_form import LibraryGameForm
from .auth_routes import validation_errors_to_error_messages

library_routes = Blueprint('library', __name__)



# * -----------  GET  --------------
# Returns all the games in the user's library

@library_routes.route('')
@login_required
def get_library():
    library = LibraryGame.query.filter_by(user_id=current_user.id).all()
    return jsonify([game.to_dict() for game in library])



#TODO -----------  POST  --------------
# Add a game to the user's library

@library_routes.route('', methods=['POST'])
@login_required
def add_to_library():
    game_id = request.json.get('game_id')
    if not game_id:
        return jsonify({'error': 'game_id is required'}), 400

    game = Game.query.get(game_id)
    if not game:
        return jsonify({'error': 'game not found'}), 404

    # Check if the game is already in the user's library
    library_game = LibraryGame.query.filter_by(user_id=current_user.id, game_id=game_id).first()
    if library_game:
        return jsonify({'error': 'game already in library'}), 400

    # Add the game to the user's library
    library_game = LibraryGame(user_id=current_user.id, game_id=game_id)
    db.session.add(library_game)

    # Remove the game from the user's cart if it's there
    cart_game = CartGame.query.filter_by(user_id=current_user.id, game_id=game_id).first()
    if cart_game:
        db.session.delete(cart_game)

    db.session.commit()
    return jsonify({'success': f'{game.title} added to library'})



#? -----------  PUT  --------------
@library_routes.route('/<int:game_id>', methods=['PUT'])
@login_required
def update_library_game(game_id):
    form = LibraryGameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        library_game = LibraryGame.query.filter_by(user_id=current_user.id, game_id=game_id).first()
        if not library_game:
            return jsonify({'error': 'Game not found in library'}), 404
        game = Game.query.get(game_id)
        if not game:
            return jsonify({'error': 'Game not found'}), 404
        library_game.game_id = game_id
        library_game.title = form.title.data
        library_game.banner_image = form.banner_image.data
        db.session.commit()
        return jsonify({'success': 'Game updated successfully', 'game': library_game.to_dict()})
    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 400



#! -----------  DELETE  --------------
# Remove a game from the user's library

@library_routes.route('/<int:game_id>', methods=['DELETE'])
@login_required
def remove_from_library(game_id):

    # Check if the game is in the user's library
    library_game = LibraryGame.query.filter_by(user_id=current_user.id, game_id=game_id).first()
    if not library_game:
        return jsonify({'error': 'game not found in library'}), 404

    game_title = library_game.game.title
    db.session.delete(library_game)
    db.session.commit()
    return jsonify({'success': f'{game_title} uninstalled'})
