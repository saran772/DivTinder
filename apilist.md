#all DevtinderApi
 
 authrouter
-post/signup
-post/login
-post/logout 

profilerouter
-get/profile/view
-patch/profile/edit
-patch/profile/password

connectionrequestrouter(interested,ignore & accepted,rejected)
-post/connection/interested/:user_id
-post/connection/ignored/:user_id
-post/connection/user/accepeted/:request_id
-post/connection/user/rejected/:request_id

userrouter
-get/user/connections
-get/user/request
-get/user/feed


