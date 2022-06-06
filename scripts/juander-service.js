const SERVICES = {
    fetch: (request) => {
        var response = httpClient.send(request);
        response.waitForComplete();
        
        if (response.isSuccess())  return response.getResponse();
        else if (response.isError()) throw new Error(response.getError());
    }
};

const JUANDERSERVICE = {
    userStatusCheck: async (email) => {
        var baseUrl = "https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/check/" + email;
        
        var options = {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            body: null
        };
        
        var response = await fetch(baseUrl, options)
        return response
    },
    bookRide: async (payload) => {
        var baseUrl = "https://cebupacificair-dev.apigee.net/ceb-poc-juander-api/auth/check/" + email;
        
        var options = {
            method: 'GET',
            headers: {"Content-Type": "application/json"},
            body: null
        };
        
        var response = await fetch(baseUrl, options)
        return response
    }
}