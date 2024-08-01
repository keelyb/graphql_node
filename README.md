
# INTRO
- graphql_node - Simple graphql hello world node express server example.

# REQUIREMENTS
- npm and node (or yarn)

# SETUP
- npm init -y
- npm install express express-graphql graphql cors


# RUN
- node server.js (or yarn start)
- Once the message appears confirming the application is running: Server running on port 4000
- Go to your favorite browser and open http://localhost:4000/graphql
- Then enter a query such as
~~~
query {
  hello
}
~~~
and the graphql results will appear on the right hand side of the page.
  
![GraphQL_NODE](https://github.com/keelyb/graphql_node/assets/7407493/fe67e6d0-896f-4c1e-9936-2a6d3bce17f6)



- Another example, enter a query:
~~~
query {
  authors {
    name
    books {
      title
      pages
    }
  }
}
~~~

and the graphql results will appear on the right hand side of the page.

![GRAPHQL_NODE_2](https://github.com/keelyb/graphql_node/assets/7407493/78d12f61-7466-431f-b3c1-a48664916e5c)




- Another example with audiobooks and videos , enter a query:
~~~
  query GetServices {
   authors {
    id
    name
    books {
      id
      title
      pages
    }
    audiobooks {
      id
      title
      durationMinutes
    }
    videos {
      id
      title
      durationMinutes
    }
  }
}
  ~~~
and the graphql results will appear on the right hand side of the page.


![image](https://github.com/user-attachments/assets/d2af006c-6ab1-4e4e-afac-c87dfa56c619)



# DOCKER

To run the Docker:
~~~
docker build -t docker-nodegraphql-image:1.0 .

docker run -d -p 4000:4000 --name docker-nodegraphql-container docker-nodegraphql-image:1.0
~~~
# REFERENECES

- https://graphql.org/learn/schema/
