from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    reviewer_id = IntegerField('Reviewer ID')
    game_id = IntegerField('Game ID')
    recommended = BooleanField('Recommend? (T or F)')
    description =  StringField('Description', validators=[DataRequired()])
    