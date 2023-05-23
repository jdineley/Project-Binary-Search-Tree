class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.array = array
        this.root = this.buildTree()
    }
    buildTree(){
        const sortedNoDupsArr = this.array.sort((a,b) => {
            return a - b
        }).filter((el,i,ar) => i === ar.indexOf(el))
        const n = sortedNoDupsArr.length-1

        function root(start, end) {
            if(start > end) {
                return null;
            }
            const mid = Math.floor((start + end) / 2);
            const node = new Node(sortedNoDupsArr[mid]);
    
            node.left = root(start, mid-1);
            node.right = root(mid+1, end);
    
            return node
        }
        return root(0,n)
    }
    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        
        if (node === null) {
            return;
          }
          if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
          }
          console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
          if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
          }
    }
    inOrderPrint(node = this.root) {
        if(node === null) return;
        inOrder(node.left);
        console.log(node.data);
        inOrder(node.right)
    }
    // Insert always happens at a leaf
    insert(data, node = this.root) {
        function findLeafNodeAndAdd(node, data) {
            if(node === null) {
                node = new Node(data)
                return node
            }
            if(data < node.data) node.left = findLeafNodeAndAdd(node.left, data);
            
            if(data > node.data) node.right = findLeafNodeAndAdd(node.right, data)
            return node
        }
  
        findLeafNodeAndAdd(node, data)

    }
    delete(data, node = this.root) {
        // case 1: leaf node
        // case 2: node with one child (make the parent of the target node point to the child of the parent node)
        // case 3: node with two children:
        //  1. Find the next biggest node (the left most tree in the target node's right subtree)
        //  2. Replace the target node's key with the key from #1
        //  3. Then remove the node from #1 -  Removing this node will be one of the 3 cases described
        const findNodeToDelete = (data, node) => {
            if(node === null) return null
            if(node.data === data) {
                if(node.left === null && node.right === null) {
                    return null
                }
                else if(node.left === null || node.right === null) {
                    return node.left || node.right
                }
                else {

                    let nextInOrder = this.smallestSuccessor(node.right)
                    node.data = nextInOrder
                    node.right = findNodeToDelete(nextInOrder, node.right)
                }
            } 
            if(data < node.data)  node.left = findNodeToDelete(data, node.left)
            if(data > node.data)  node.right = findNodeToDelete(data, node.right)
            return node
        }
        findNodeToDelete(data, node)
    }
    smallestSuccessor(node) {
        let minv = node.data;
        while(node.left !== null){
            minv = node.left.data;
            node = node.left
        }
        return minv
    }
    find(data, node = this.root) {
        
        const findRec = (data, node) => {
            if(node === null || data === node.data) {
                return node
            } else if(data < node.data){
                return findRec(data, node.left)
            } 
            else {
                return findRec(data, node.right)
            }
        }
        return findRec(data, node)
        
    }
    // 1. Visit node to discover linked nodes to add then to the queue (Enqueue)
    // 2. Read data from visited node and dequeue from queue
    // 3. Visit node at the front of the queue and continue the process
    // Breadth first
    levelOrder(callback) {
        let values = []
        let queue = [this.root]
        while(queue.length > 0) {
            if(queue[0] !== null) {
                queue.push(queue[0].left, queue[0].right)
                values.push(queue[0].data)
            }
            let shiftedNode = queue.shift()
            if(callback) callback(shiftedNode)
        }
        if(!callback) return values
    }
    // Depth first
    inorder(node = this.root, callback){
        let values = [];
        function inorderRec(node, callback) {
            if(node === null) return
            inorderRec(node.left, callback)
            values.push(node.data);
            if(callback) callback(node);
            inorderRec(node.right, callback)
        }
        inorderRec(node, callback)
        if(!callback) return values
    }
    // Depth first
    preorder(node = this.root, callback){
        let values = [];
        function preOrderRec(node, callback) {
            if(node === null) return
            values.push(node.data);
            if(callback) callback(node);
            preOrderRec(node.left, callback)
            preOrderRec(node.right, callback)
        }
        preOrderRec(node, callback)
        if(!callback) return values
    }
    // Depth first
    postorder(node = this.root, callback){
        let values = [];
        function postorderRec(node, callback) {
            if(node === null) return
            postorderRec(node.left, callback)
            postorderRec(node.right, callback)
            values.push(node.data);
            if(callback) callback(node);
        }
        postorderRec(node, callback)
        if(!callback) return values
    }
    height(node = this.root) {
        if(node === null) return -1
        return Math.max(this.height(node.left), this.height(node.right)) + 1
    }
    depth(data = this.root.data) {
        let slectedNode = this.find(data)
        return this.height() - this.height(slectedNode)
    }
    isBalanced(node = this.root) {
        if(Math.abs(this.height(node.left) - this.height(node.right)) <= 1) {
            return true
        } else {
            return false
        }
    }
    rebalance() {
        this.array = this.inorder()
        this.root = this.buildTree()
    }
}

module.exports = Tree

