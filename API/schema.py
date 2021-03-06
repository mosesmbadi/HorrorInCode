from graphene_django import DjangoObjectType
from API.models import Project, Tag, Article
from graphene import relay
import graphene


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project


class ProjectQuery(object):

    projects = graphene.List(ProjectType)
    project = graphene.Field(
        ProjectType,
        id=graphene.Int()
    )

    def resolve_projects(self, info, **kwargs):
        return Project.objects.all()

    def resolve_project(self, info, **kwargs):
        id = kwargs.get('id')

        if id is None:
            return None

        return Project.objects.get(pk=id)


class TagType(DjangoObjectType):
    class Meta:
        model = Tag


class ArticleNode(relay.Node):
    class Meta:
        name = "Node"

    @staticmethod
    def to_global_id(type, id):
        return id
    
    @staticmethod
    def get_node_from_global_id(info, global_id, only_type=None):
        model = getattr(ArticleQuery.info.field_name).field_type._meta.model
        return model.objects.get(id=global_id) 


class ArticleType(DjangoObjectType):

    class Meta:
        model = Article
        interfaces = (ArticleNode, )


class ArticleConnection(relay.Connection):
    class Meta:
        node = ArticleType


class ArticleQuery:

    tags = graphene.List(TagType)
    articles = graphene.relay.ConnectionField(ArticleConnection)
    article = graphene.Field(
        ArticleType,
        id=graphene.Int(),
    )

    def resolve_articles(self, info, **kwargs):
        return Article.objects.all()

    def resolve_tags(self, info, **kwargs):
        return Tag.objects.all()

    def resolve_article(self, info, **kwargs):
        id = kwargs.get('id')
        if id is None:
            return None

        return Article.objects.get(pk=id)
