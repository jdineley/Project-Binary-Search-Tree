const Tree = require('./Balanced-Binary-Search-Tree')

function randomNumArray(n, min, max) {
    let array = []
    for(let i = 0; i < n; i++) {
        array.push(Math.floor(Math.random() * (max-min)))
    }
    return array
}

function driver(tree) {
    console.log('*****************************************')
    tree.prettyPrint()
    console.log('*****************************************')
    console.log('isBalanced:')
    console.log(tree.isBalanced())
    console.log('*****************************************')
    console.log('LevelOrder:',tree.levelOrder(),'preorder:', tree.preorder(),'inorder:', tree.inorder(),'postorder:', tree.postorder())
    console.log('*****************************************')
    console.log('Unbalancing...')
    tree.insert(100)
    tree.insert(200)
    tree.insert(300)
    tree.insert(400)
    tree.prettyPrint()
    console.log(`Tree is now balanced: ${tree.isBalanced()}`)
    console.log('*****************************************')
    console.log('balancing.....')
    tree.rebalance();
    tree.prettyPrint()
    console.log(`Tree is now balanced: ${tree.isBalanced()}`)
    console.log('*****************************************')
    console.log('LevelOrder:',tree.levelOrder(),'preorder:', tree.preorder(),'inorder:', tree.inorder(),'postorder:', tree.postorder())
    console.log('*****************************************')
}

driver(new Tree(randomNumArray(20, 0, 50)))