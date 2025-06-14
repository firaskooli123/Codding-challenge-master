innosabi engineer frontend challenge
===================================

One of innosabi's core platform functionalities is the possibility for searching and reading suggestions 
that different users have created within topics. 

You can only finish this frontend once the backend part of this challenge is done. It provides a
suggestion search api. Your task is to create an application that displays suggestions and allows users searching
for them using a text input.

### User Story
As a user
I want to be able to read and search suggestions.

As a user
when I search suggestions, I expect that I can write a text snippet. After that it shows me only suggestions that
contain this text snippet either within the title or the content.

As a user
when I use the search - in the list of suggestions that is found through my search it should highlight my search
text within the suggestions that are displayed on the page so that I can immediately see where in each suggestion my
search text was found

### Acceptance Criteria
- When the application loads I can see a text input and some suggestions with their title and content
  on my screen
- After typing text in the search field, I would only see suggestions that match with what I typed
- The text which I search for is highlighted within displayed suggestions
- The suggestions that I see on the page contain at least title and content

### Documentation
When a user searches for "innovation", the search request would look like this

``yourBackendEndpoint?filter=[{"name":"any","modifiers":[{"name":"fields","params":["title","content"]},{"name":"contains","params":["innovation"]}]}]``

The filter param is json encoded data with following [json-schema](https://json-schema.org/)

### Configuration Docker

Ce projet est configuré avec Docker pour faciliter le développement et le déploiement.

#### Environnement de développement

Pour lancer l'application en mode développement :

```bash
docker-compose -f docker-compose.dev.yml up --build
```

The filter param is json encoded data with following [json-schema](https://json-schema.org/)
```json
{
    "$schema": "http://json-schema.org/draft-07/schema",
    "$id": "innosabi/rich-param",
    "type": "array",
    "items": {
        "$id": "#/items",
        "type": "object",
        "required": [
            "name",
            "modifiers"
        ],
        "properties": {
            "name": {
                "$id": "#/items/properties/name",
                "type": "string"
            },
            "modifiers": {
                "$id": "#/items/properties/modifiers",
                "type": "array",
                "items": {
                    "$id": "#/items/properties/modifiers/items",
                    "type": "object",
                    "required": [
                        "name",
                        "params"
                    ],
                    "properties": {
                        "name": {
                            "$id": "#/items/properties/modifiers/items/properties/name",
                            "type": "string"
                        },
                        "params": {
                            "$id": "#/items/properties/modifiers/items/properties/params",
                            "type": "array",
                            "items": {
                                "$id": "#/items/properties/modifiers/items/properties/params/items",
                                "type": "string"
                            }
                        }
                    }
                }
            }
        }
    }
}
```
