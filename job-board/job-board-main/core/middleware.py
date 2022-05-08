class AttachLink:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.user.is_authenticated:
            if request.user.link.link_type == 'C':
                request.user_type = 'C'
                request.link = request.user.link.candidate
            else:
                request.user_type = 'E'
                request.link = request.user.link.employer
        response = self.get_response(request)
        return response