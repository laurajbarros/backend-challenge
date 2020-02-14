# PepperHQ Back-end/Full Stack developer challenge

## TL;DR
* Coding challenge represents day-to-day work at PepperHQ
* Estimated time to complete: **2/3 hours**
* If you already have easily accessible examples of your own code you want to use instead, email us!
* We will use this as a way to initially analyse your abilities as well as in the phone interview, for a code review and starting off point for a general technical discussion.
* If you have any feedback on the interview process, email us! 
* Go straight to [Task Specification](#task-specification)

## General
From our point of view, an arbitrary whiteboard test assessed by interviewers looking over your shoulder is an unrealistic way to measure how developers actually work on a day-to-day basis. Instead, we have tried to produce a challenge that represents the type of work that we do at PepperHQ for you to complete at your own pace.

This is a way for candidates to demonstrate their abilities to us if they don't have any freely accessible examples already. If you already have easily accessible examples that you feel demonstrates your abilities, feel free to send us an email and we can use this instead. 

After completing the coding challenge, one of our developers will analyse it and we will use it as a way to start a dialogue between us in the interview, in the form of a code review and general technical discussion.

We are always open to iterating on our interview process so please email us if you have any feedback.

## Contact Details
Email address: devchallenge@pepperhq.com

# [Task Specification](#task-specification)

When a user starts the ordering journey, they are presented with a menu to select food & drinks from. In most cases, the menu is pulled from from a 3rd party such as a merchant's point of sales system. In some cases, the menu from the 3rd party won't map directly to our menu schema so we will need to extend it with extra information such as human-readable titles before showing it to the user. Some of these 3rd parties also have rate limited APIs so we cache this menu every 24 hours.

The task is to build an api with a singular endpoint `/menu/:id` that:
* Pulls the menu from the fake point of sale service
* Extends the product's in the menu with a list of human-readable titles from titles.json
* Caches the menu with a 24 hour expiration policy
* Returns the menu as json



