class circularLinkedList{
  constructor(){
    this.head = null;
    this.tail = null;
  }

  getHead(){
    return this.head;
  }

  addNode(node){
    if (this.head === null){
      this.head = new ListNode(node);
      this.tail = this.head;

      this.head.nextNode = this.tail;
      this.head.prevNode = this.tail;
      this.tail.nextNode = this.head;
      this.tail.prevNode = this.tail;
    }else{
      this.tail.nextNode = new ListNode(node);
      this.tail.nextNode.prevNode = this.tail;
      this.tail = this.tail.nextNode;
      this.tail.nextNode= this.head;

      this.head.prevNode = this.tail;
    }
  }
}

class ListNode{
  constructor(content){
    this.nextNode =null;
    this.prevNode = null;
    this.content =  content;
  }
}


export default circularLinkedList;