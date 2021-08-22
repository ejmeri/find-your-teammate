from src.shared.extract_jwt_payload import ExtractJwtPayload
from flask import request
from bson.objectid import ObjectId
from flask.blueprints import Blueprint

from src.shared.api_return import ApiReturn
from src.business.users.entity.user_auth import UserAuth

from src.business.posts.entity.post import Post
from src.business.posts.entity.comment import Comment

from src.business.posts.control.post_repository import PostRepository

postController = Blueprint('post_controller', __name__, url_prefix='/posts')


class PostController():

    @postController.post('')
    def create():
        payload = request.json

        if not 'content' in payload.keys():
            return ApiReturn.error('Conteúdo da publicação é obrigatório'), 400

        userAuth = ExtractJwtPayload.extract(request.headers.get('Authorization'))
        if isinstance(userAuth, ApiReturn):
            return userAuth

        payload['userId'] = userAuth['user_id']
        payload['userLogin'] = userAuth['login']

        try:
            post = Post(**payload)
        except Exception as error:
            return ApiReturn.error('Erro durante o processamento', str(error)), 500

        PostRepository.create(post.toCreateJson())

        return ApiReturn.success('Publicação criada com sucesso', str(post._id)), 201

    @postController.put('/<id>/comments')
    def newComment(id: str):
        if ObjectId.is_valid(id) == False:
            return ApiReturn.error('Identificação do post inválida'), 400

        payload = request.json

        if not 'content' in payload.keys():
            return ApiReturn.error('Conteúdo do comentário é obrigatório'), 400

        auth_user = ExtractJwtPayload.extract(request.headers.get('Authorization'))
        if isinstance(auth_user, ApiReturn):
            return auth_user 

        payload['userId'] = auth_user['user_id']
        payload['userLogin'] = auth_user['login']

        try:
            comment = Comment(**payload)
        except Exception as error:
            return ApiReturn.error('Erro durante o processamento', str(error)), 500

        PostRepository.pushComment(id, comment.toCreateJson())

        return ApiReturn.success('Comentário publicado com sucesso', str(comment._id)), 201


    @postController.get('/<id>/comments')
    def findComments(id):
        if ObjectId.is_valid(id) == False:
            return ApiReturn.error('Identificação do post inválida'), 400

        auth_user = ExtractJwtPayload.extract(request.headers.get('Authorization'))
        if isinstance(auth_user, ApiReturn):
            return auth_user

        commentsDb = PostRepository.findComments(id)
        if not commentsDb:
            return ApiReturn.success('Nenhum comentário encontrado'), 200

        comments: Comment = []
        for comment in commentsDb['comments']:
            comment['_id'] = str(comment['_id'])
            comment['userId'] = str(comment['userId'])
            comments.append(comment)

        return ApiReturn.success(response=comments), 200