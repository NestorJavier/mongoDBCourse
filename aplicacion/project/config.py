from decouple import config

URL = 'mongodb+srv://nestorjavier:{}@cluster0-ttodu.mongodb.net/cursoMongoDB?retryWrites=true&w=majority'.format(
    config('MONGO_PASSWORD', default='password')
)