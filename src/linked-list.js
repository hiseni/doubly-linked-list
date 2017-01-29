const Node = require('./node');

class LinkedList {
    constructor() {
        this[Symbol.for('head')] = this[Symbol.for('tail')] = null;
        this[Symbol.for('length')] = 0;
    }

    // Just to complement tests
    get _head() {
        return this[Symbol.for('head')];
    }

    get _tail() {
        return this[Symbol.for('tail')];
    }

    get length() {
        return this[Symbol.for('length')];
    }

    append(data) {
        let node = new Node(data);

        if (this.isEmpty()) {
            this[Symbol.for('head')] = node;
        } else {
            node.prev = this[Symbol.for('tail')];
            this[Symbol.for('tail')].next = node;
        }

        this[Symbol.for('tail')] = node;
        this[Symbol.for('length')]++;

        return this;
    }

    head() {
        // Gate silent null has no properties error
        return (this[Symbol.for('head')])
            ? this[Symbol.for('head')].data
            : null;
    }

    tail() {
        return (this[Symbol.for('tail')])
            ? this[Symbol.for('tail')].data
            : null;
    }

    getNode(index) {
        let current = null;

        // Index out of bounds case
        if (index < 0 || index > this[Symbol.for('length')] - 1) {
            return current;
        }

        // Start counting from the head, if we have index from the first half of the list
        if (index < this[Symbol.for('length')] / 2) {
            current = this[Symbol.for('head')];

            // var is a bit faster to use here
            for (var j = 0; j < index; j++) {
                current = current.next;
            }

        // Otherwise, start counting from the tail
        } else {
            current = this[Symbol.for('tail')];

            for (var j = this[Symbol.for('length')] - 1; j > index; j--) {
                current = current.prev;
            }
        }

        return current;
    }

    at(index) {
        let current = this.getNode(index);

        return (current)
            ? current.data
            : null;
    }

    insertAt(index, data) {
        let current = this.getNode(index);

        if (current) {
            let node = new Node(data);

            node.prev = current.prev;
            node.next = current;

            current.prev.next = node;
            current.prev = node;

            this[Symbol.for('length')]++;
        }

        return this;
    }

    isEmpty() {
        return !this[Symbol.for('length')];
    }

    clear() {
        this[Symbol.for('head')] = this[Symbol.for('tail')] = null;
        this[Symbol.for('length')] = 0;

        return this;
    }

    deleteAt(index) {
        let current = this.getNode(index);

        if (current && current.next) {
            current.prev.next = current.next;
            current.next.prev = current.prev;

            current.next = current.prev = null;

            this[Symbol.for('length')]--;
        }

        return this;
    }

    reverse() {
        let current = this[Symbol.for('head')];

        while (current) {
            // Swap prev & next pointers
            [ current.prev, current.next ] = [ current.next, current.prev ];
            current = current.prev;
        }

        [
          this[Symbol.for('head')],
          this[Symbol.for('tail')]
        ] = [
          this[Symbol.for('tail')],
          this[Symbol.for('head')]
        ];

        return this;
    }

    indexOf(data) {
        let current = this[Symbol.for('head')];
        let index = -1;

        while (current) {
            index++;

            if (current.data === data) {
                return index;
            }

            current = current.next;
        }

        return -1;
    }

    // Look, we have an @@iterator!
    // Have fun iterating! :D
    *[Symbol.iterator]() {
        let current = this[Symbol.for('head')];

        while (current) {
            yield current.data;
            current = current.next;
        }
    }
}

module.exports = LinkedList;
