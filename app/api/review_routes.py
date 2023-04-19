from flask import Blueprint, redirect, request
from app.models import User, Game, Review, db
from flask_login import current_user, login_required
from ..forms.review_form import ReviewForm
from flask_wtf.csrf import CSRFProtect, generate_csrf

review_routes = Blueprint('reviews', __name__)

#TODO READS

# * -----------  GET  --------------
# Returns a list of all reviews that have been made

@review_routes.route('')
def get_all_reviews():
    reviews = Review.query.all()
    return ([review.to_dict() for review in reviews])


# * -----------  GET  --------------
# Returns a single review

@review_routes.route('/<int:review_id>')
def get_single_review(review_id):
    review = Review.query.get(review_id)
    return review.to_dict()


#TODO -----------  POST  --------------
@review_routes.route('', methods=['POST'])
@login_required
def create_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_review = Review(
            reviewer_id=form.data['reviewer_id'],
            game_id=form.data['game_id'],
            recommended=form.data['recommended'],
            description=form.data['description']
        )
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    else:
        return {"errors": form.errors}, 400