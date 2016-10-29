---  
layout: post_page
title: OCCallBack notes
---
>Who you are is different from what you do

Target-action:   
Before the wait begins, you say "When this event happens, send this message to this object." The object receiving the message is the target. The selector for the message is the action.(1-1)

Helper objects:    
Before the wait begins, you say "Here is an object that will take on a role that helps another object do its jobs. When one of the events related to this role occurs, send a message to the helper object." Helper objects are often known as delegates or datasource.(1-n)

Notification:    
There is an object callded the notification center. When an event happens, a notification associated with that event will be posted to the notification center.Before the wait begins, you tell the notification center "This object is intersted in this kind of notification. When one is posted, send this message to the object."(n-n)

Blocks:    
A block is just a chunk of code to be excuted. Before the wait begins, you say "Here is a block. When this event happens, excute this block." (1-1&&Elegant)

回调的意义:   
A生成并且持有对象B,B声明的函数由X来实现，X可以是A或者其他对象，X在以上前三种回调分别表示target,delegate,object。

关于blocks:   
A对象给了一个block给B,B负责调用这个block，但是怎样去实现却由A来决定，这样就是实现了B在能访问A的上下文的同时进行函数调用。

Blocks和其他回调的区别:   
Blocks和其他回调机制不同的地方之一是blocks的实现可以写在传blocks的附近，而不是在几百行之后。