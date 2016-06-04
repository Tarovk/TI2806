|      |            |
|------|------------|
|Group | BussInfraManDevOps (TSE One) |
|Assignment|Sprint 6|
|Date|04/06/16|
|TA|Bastiaan Reijm|

#Sprint Feedback
Feedback and Grades for Sprint 6.

Total: ****

| User Story | Score |
|------------|-------|
| definition |      |
| splitting  |      |
| responsibility |   |

| Learning from History | Score |
|-----------------------|-------|
| estimation            |    |
| prioritisation        |     |
| reflection            |     |

## Notes
* Thanks for adding the overview of what was and what wasn't finished
* Reflection is missing why "Write documentation for the tests" wasn't finished
* 8 points for writing documentation?
	* Hard to tell how many hours this is worth, but what sort of documentation were you planning on writing?
* 20 point tasks usually should be split into smaller tasks

#Code Evolution Quality Feedback

Total: ****

| Architecture                       | Score |
|------------------------------------|-------|
| Changes                            |      |
| Architecture Design Document (ADD) |      |

|                     | Score |
|---------------------|-------|
| Code Change Quality |      |

| Code Readability | Score |
|------------------|-------|
| Formatting       |      |
| Naming           |      |
| Comments         |      |

| Continuous Integration | Score |
|------------------------|-------|
| Building               |      |
| Testing                |      |

|         | Score |
|---------|-------|
| Tooling |      |

| Pull-based Development | Score |
|------------------------|-------|
| Branching              |     |
| Code Review            |      |

##Notes
* ADD
	* How have you met you're design goals so far?
	* Good sequence diagrams!
* Keep up the reviewing process
* Didn't tag the new version
* `graph1.js` is not a proper name
* `time.js` is a misleading name
	* `time_spent_per_pr` or `time_spent_on_pr` would be better
* `SvgCreator` + services (everything in `main.js`) + `Settings` seems like a good candidate for a Singleton but isn't
* `cache.js` - use cache not cash in naming and comments