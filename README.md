# Async queue

## Description

This is a simple async queue implementation in JavaScript.

## Motivation

I needed a simple async queue implementation for a project I was working on so I decided to write one.

I wanted to keep it simple and easy to understand so I decided to use a simple array to store the promises and recursively process them.

The trouble I was having was that I needed to be able to process some request (button click) while others were still running in the background in a loop without blocking each other.
