<h1>Microservice: Post-Service</h1>

<h2> Development Environment </h2>

<h3> Prerequisites: </h3>

<h4>AWS Configuration:</h4>

1. It is recommended to create a new IAM user from the AWS account, you will be asked to download a credentials file, download that.<br>
2. Configure AWS on your local environment using command "aws configure". You will be asked to enter the information which you can take from the credentials file which we downloaded in previous step.<br>

<h4>Post Service Configuration:</h4>

To configure post service you must have following Environment Variables<br> 
1. AWS_REGION<br>
2. AWS_PROFILE<br>
3. TABLE_NAME<br>

<h4>To start the App:</h4>
1. Install the dependencies from package.json using command "npm i"<br>
2. Run the command: npm dev

<h3>Api endpoints:</h3>
1. Create a new post: /api/v0/post/<br>
- Expected Body:<br>
{<br>
        "userId": "",<br>
        "category": "",<br>
        "condition": "",<br>
        "postId": "",<br>
        "description": "",<br>
        "price": "",<br>
        "title": ""<br>
    }<br>
2. Get the post: /api/v0/post/?postId=""  (based on post id)<br>
3. Delete the post: /api/v0/post/?postId=""<br>
4. Update teh post: /api/v0/post/<br>
- Expected body:<br>
    {<br>
        "category": "",<br>
        "condition": "",<br>
        "postId": "",<br>
        "userId": "",<br>
        "description": "",<br>
        "price": "",<br>
        "title": ""<br>
    }<br>
