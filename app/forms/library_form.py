from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class LibraryGameForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    banner_image = StringField('Banner Image', validators=[DataRequired()])
    submit = SubmitField('Save Changes')
    