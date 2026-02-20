Title of the project: Creating a HootSolvedIt.Me website which is a frontend game for my MurderMysteryAPI

Name: Serena KM 

Idea: 
•	I started with Murder Mystery API repo but as I continued in my Frontend Masters studies, after following along with Jem Young's Full Stack Fundamentals v3, I decided to expand the idea out to also include a full-stack board game that expands on the Murder Mystery API idea

Requirements:
•	Snakes and ladders style board game where you roll the dice to progress and land on either a clue tile, challenge tile, suspect tile, crime scene tile
•	You need to roll the dice again to pass that tile - e.g. successfully get the clue, get further information about a suspect such as whether their alibi is true or false or what their possible motives are, get further crime scene details such as insight (key objects or key observations)
•	If you fail a roll, you will slide down the snake - this raises the difficulty level of the tiles that the player would be re-traversing over
•	First tile in the board should be the crime scene (because detectives usually visit the crime scene first before anything else)
•	Last tile is the accusation tile

Reflection (process, challenges, successes, learnings):
•	I continued with Scott Moss' API Design in Node.js v5 and updated the code, learning about how to dependencies that were already installed on his repo and how to bring it into my website. This involved learnings such as making sure that the types section in the tsconfig was correct so that Node could resolve process.env
•	Thinking ahead in terms of database schemas e.g. if I wanted to add the ability to add users and for users to save their game session
•	Seeding databases when there is a dependency on a UUID - using indexes instead of the Id and making sure that your indexes start at 0 when you only have one item in the JSON file
•	Learning to use Express.js, Node.js, Zod schemas, Nginx, Docker, Bash, TypeScript, Vitest, Supertest for HTTP assertion, using CLI/Ubuntu, buying a domain, setting up a server, linking a database
•	Making sure to drill down into the object and not accidentally just passing the object as a key containing the properties I want to access
•	Learning React, Vite, Tanstack, Eslint with Brian Holt's Complete Intro to React, v9 and implementing a front-end

Entity Relationship Diagram
+-------------------------+                +-------------------------+
| Cases                   |                | Crime Scenes            |  
+-------------------------+                +-------------------------+
| CaseID (primary)        | ----------->   | CrimeSceneID (primary)  |
| Background              |       1:1      | CaseID (foreign)        |
+-------------------------+                | Location                | 
                                           | Description             | 
                                           | Difficulty              |     
                                           | Insight                 |   
                                           +-------------------------+
 
                                           +-----------------------+      
                                           | Suspects              |      
                                           +-----------------------+
                                           | SuspectID (primary)   |  
                            ----------->   | CaseId (foreign)      | 
                                1:many     | Name                  |    
                                           | Occupation            |   
                                           | RelationshipToVictim  | 
                                           | PossibleMotive        |   
                                           | ClaimedAlibi          |
                                           | Difficulty            |  
                                           | TrueAlibi             |       
                                           +-----------------------+  

                                           +-----------------------+      
                                           | Clues                 |      
                                           +-----------------------+
                                           | ClueID (primary)      |  
                            ----------->   | CaseId (foreign)      | 
                                1:many     | Difficulty            |    
                                           | ClueInfo              |    
                                           +-----------------------+  

                                           +------------------------+      
                                           | Board Tiles            |      
                                           +------------------------+
                                           | BoardTileID (primary)  |  
                            ----------->   | CaseId (foreign)       | 
                                1:many     | TileIndex              |    
                                           | Type                   |   
                                           | TypeID (foreign)       |  -----------> Crime Scene, Suspect or Clue
                                           | SnakeTo                |      1:1
                                           | LadderTo               |
                                           +------------------------+  