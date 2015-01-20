# Angular

### Controllers 
- Scattered use of $http in various controllers: AccountInfoCtrl, AdminCtrl, Cart.  Should move these reusable things into Services/Factories
- AdminCtrl is very heavy, lighten by using fractal MVC pattern to minimize things like Cat, User Admin all in one controller
- Good use of moving 

## Use of Factories
- Nascent use of factories, consider pushing a lot more logic into the factories, especially any logic that converses with the backend
- Controllers should not really communicate with the backend, they should handle events 
- Inconsistent use of factories, some are $resource, some are singletons for frontend data storage and some are custom $http.  This is expected as you probably changed behavior based on learnings but would be worthwhile to refactor to using one solution.

### Directives
- Glad to see you were using Directives for mostly template reuse - consider also using for some of the more complex front-end logic

### Views

- Not too much logic in your views (which is good) except for Admin View

### General

Frontend looks good but needs some refactoring for Angular best practices.  Definitely $http -> factories is biggest issue.