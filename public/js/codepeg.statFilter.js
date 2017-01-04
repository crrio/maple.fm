// Our namespace
var CodePeg = CodePeg || {};

(function ($) {
    "use strict";

    /**
     * Constructs a CodePeg.StatFilter object.
     * 
     * @param {Object} element The element or selector to attach to
     * @param {Object} options A dictionary of options that we will use
     */
    CodePeg.StatFilter = function(element, options) {
        // The selector that we're attaching to
        this.attach(element);

        // Set up our options
        this.setOptions(options);

        // Init
        this.init();
    };

    CodePeg.StatFilter.prototype = {

        /**
         * All events used by CodePeg.StatFilter.  This is a list of available
         * events that can be registered on a StatFilter object.
         *
         * Events can be registered like so, where object is a StatFilter object:
         * object.on("eventName", closure);
         * 
         * @type {Array}
         */
        events: ['addChild', 'removeChild', 'childChanged'],
        eventMap: {},

        /**
         * The default options.
         * @type {Object
}FFXIV         */
        defaultOptions: {
            selector: '#add-filter',
            deleteSelector: '#remove-filter',
            container: '#stat-filter',
            html: '<li class="radio inline">' +
                '<select class="stat-select form-control input-sm">' +
                    '<option value="">Select stat filter</option>' +
                    '{filters}' +
                '</select> ' +
                '<select class="stat-comparator" style="width:56px;display:inline-block;">' +
                    '<option value=">=">&ge;</option>' +
                    '<option value="<=">&le;</option>' +
                    '<option value="==">=</option>' +
                '</select> ' +
                '<input type="number" class="stat-value" min="0" style="width:63px;display:inline-block;">' +
            '</li>',
            filters: {
//                a: ['Quantity'],
//                b: ['Bundle'],
                c: ['Price'],
//                d: ['Channel'],
//                e: ['Room'],
//                f: ['Shop Name'],
//                g: ['Character Name'],
                W: ['Required Level'],
                h: ['Upgrades Available'],
                i: ['Scroll Count'],
                H: ['Enhancement Count'],
                A: ['Hammers Applied'],
                j: ['STR', /STR(\s)*:(\s)*\+([\d]+)$/, 3],
                k: ['DEX', /DEX(\s)*:(\s)*\+([\d]+)$/, 3],
                l: ['INT', /INT(\s)*:(\s)*\+([\d]+)$/, 3],
                m: ['LUK', /LUK(\s)*:(\s)*\+([\d]+)$/, 3],
                allStats: ['All Stats', /All Stats(\s)*:(\s)*\+([\d]+)$/, 3],
                n: ['MaxHP', /MaxHP(\s)*:(\s)*\+([\d]+)$/, 3],
                o: ['MaxMP', /MaxMP(\s)*:(\s)*\+([\d]+)$/, 3],
                p: ['ATT', /ATT(\s)*:(\s)*\+([\d]+)$/, 3],
                q: ['Magic ATT', /Magic ATT(\s)*:(\s)*\+([\d]+)$/, 3],
                r: ['Weapon DEF', /Weapon DEF(\s)*:(\s)*\+([\d]+)$/, 3],
                s: ['Magic DEF', /Magic DEF(\s)*:(\s)*\+([\d]+)$/, 3],
                t: ['Accuracy', /Accuracy(\s)*:(\s)*\+([\d]+)$/, 3],
                u: ['Avoidability', /Avoidability(\s)*:(\s)*\+([\d]+)$/, 3],
                v: ['Diligence'],
                w: ['Speed', /Movement Speed(\s)*:(\s)*\+([\d]+)$/, 3],
                x: ['Jump', /Jump(\s)*:(\s)*\+([\d]+)$/, 3],
                B: ['Battle Mode Att.'],
                C: ['% Boss Damage', /Damage to Bosses(\s)*:(\s)*\+([\d]+)%$/, 3],
                D: ['% Ignore DEF', /Ignores ([\d]+)% of the enemy's DEF when attacking\.$/, 1], //'

                // Below this line are special filters that should not be messed with
                percentSTR: ['% STR', /STR(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentDEX: ['% DEX', /DEX(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentINT: ['% INT', /INT(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentLUK: ['% LUK', /LUK(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentAllStats: ['% All Stats', /All Stats(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentMHP: ['% MaxHP', /MaxHP(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentMMP: ['% MaxMP', /MaxMP(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentAtt: ['% ATT', /ATT(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentMagicAtt: ['% Magic ATT', /Magic ATT(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentTotalDamage: ['% Total Damage', /Total Damage(\s)*:(\s)*\+([\d]+)%$/, 3],
                critRate: ['% Critical Rate', /Critical Rate(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentMinCrit: ['% Min Crit Damage', /Min Crit Damage(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentMaxCrit: ['% Max Crit Damage', /Max Crit Damage(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentWDef: ['% Weapon DEF', /Weapon DEF(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentMDef: ['% Magic DEF', /Magic DEF(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentAccuracy: ['% Accuracy', /Accuracy(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentAvoid: ['% Avoidability', /Avoidability(\s)*:(\s)*\+([\d]+)%$/, 3],
                allSkills: ['+ All Skills', /All Skills(\s)*:(\s)*\+([\d]+)(\s)*Levels$/, 3],
                maxDamageCap: ['+ Max Damage Cap', /Max Damage Cap Increase(\s)*:(\s)*\+([\d]+)$/, 3],
//                invincibleTime: ['+ Invincible Time'],
                abnormalDuration: ['- Abnormal Status Duration', /Abnormal Status Duration(\s)*:(\s)*\-([\d]+)(\s)*sec\.$/, 3],
                percentRecovery: ['% HP Recovery', /HP Recovery Items and Skills(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentElementalResist: ['% Elemental Resistance', /All Elemental Resistances(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentStatusResist: ['% Abnormal Status Resistance', /Abnormal Status Resistance(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentExp: ['% EXP Obtained', /EXP Obtained(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentMesos: ['% Mesos Obtained', /Mesos Obtained(\s)*:(\s)*\+([\d]+)%$/, 3],
                percentItems: ['% Item Drop Rate', /Item Drop Rate(\s)*:(\s)*\+([\d]+)%$/, 3],
            },

            /**
             * True if potentials should be included in calculations for stats
             * such as +STR.
             * @type {Boolean}
             */
            includePotentials: true,
 
            potentials: ['I', 'J', 'K'],
            bonusPotentials: ['L', 'M', 'N'],
        },

        /**
         * An array of filters we currently have in place.  This is just used to
         * keep track of the DOM objects we've made.
         * @type {Array}
         */
        childFilters: [],

        /**
         * A cache of the user's filters, mapping the stat select to an array
         * containing [comparator, value].
         * @type {Object}
         */
        cachedFilters: {},

        init: function() {
            // Perform replace on html var
            var filterOptions = '',
                filters = this.options.filters;

            for (var key in filters) {
                if (filters.hasOwnProperty(key)) {
                    filterOptions += '<option value="' + key + '">' + 
                            filters[key][0] + '</option>';
                }
            }
            this.options.html = this.options.html.replace('{filters}', filterOptions);

            this.connectFilters();
        },

        connectFilters: function() {
            var $selector = $(this.options.selector),
                $deleteSelector = $(this.options.deleteSelector),
                $container = this.element,
                html = this.options.html,
                that = this;

            $selector.click(function() {
                var $child = that.doAddChild();
                that.cachedFilters = that.getFilters();
                if (that.eventMap.childChanged) {
                    that.eventMap.childChanged($child);
                }
            });

            $deleteSelector.click(function() {
                that.doRemoveLastChild();
            });

            // Only show delete selector when necessary
            this.toggleDeleteSelector();
        },

        toggleDeleteSelector: function() {
            var $deleteSelector = $(this.options.deleteSelector);

            if (this.childFilters.length > 0) {
                // show delete selector
                $deleteSelector.show();
            } else {
                // hide delete selector
                $deleteSelector.hide();
            }
        },

        /**
         * Adds event handling to a jQuery HTML object that contains 
         * stat-select, stat-comparator, and stat-value children.
         * 
         * @param {[type]} $child [description]
         */
        addEventsToChild: function($child) {
            var that = this,
                $select = $child.find('.stat-select'),
                $comparator = $child.find('.stat-comparator'),
                $value = $child.find('.stat-value'),
                eventMap = this.eventMap,
                closure = function() {
                    that.cachedFilters = that.getFilters();
                    if (eventMap.childChanged) {
                        eventMap.childChanged($child);
                    }
                };

            $select.change(closure);
            $comparator.change(closure);

            // Inputs require an "on input" instead of change. Otherwise key
            // presses won't be recognized as events.
            this.onWithDelay($value, 'input', closure, 100);
        },

        /**
         * A modified version of bindWithDelay.js that won't pollute the global
         * namespace.  We don't need the throttle, so I left it out.
         *
         * @param  {Object} $object   The object that is to receive the delayed on
         *                           event.
         * @param  {[type]} type     A string containing one or more DOM event
         *                           types, such as "click" or "submit," or 
         *                           custom event names.
         * @param  {[type]} data     An object containing data that will be
         *                           passed to the event handler.
         * @param  {[type]} handler  A function to execute each time the event
         *                           is triggered.
         * @param  {[type]} timeout  A time in milliseconds that must pass
         *                           before the event is finally called.  If the
         *                           event is triggered a second time before
         *                           this timeout passes, the count down starts
         *                           over.
         * @param {Object} always    An optional handler that is always triggered
         * @return {void}
         */
        onWithDelay: function($object, type, data, handler, timeout, always) {
            // If data is actually the function callback, shift the args over by one
            if ($.isFunction(data)) {
                timeout = handler;
                handler = data;
                data = undefined;
            }

            // Allow delayed function to be removed with handler in unbind function
            handler.guid = handler.guid || ($.guid && $.guid++);

            // Bind each element separately so that they each get their own delay
            return this.element.each(function() {
                var wait = null;

                /* jshint validthis: true */
                function callback(e) {
                    var _e = $.extend(true, {}, e), // Make a deep copy of e
                        that = this,
                        throttler = function() {
                            // Success! Call the actual handler
                            wait = null;
                            handler.call(that, _e);
                        };

                    // If an always callback is set, call it
                    if (always) {
                        always.call(that, _e);
                    }

                    // If we get here, then stop any events that have yet to occur
                    // and start a new one.
                    clearTimeout(wait);
                    wait = setTimeout(throttler, timeout);
                }

                callback.guid = handler.guid;

                $object.on(type, data, callback);
            });
        },

        doAddChild: function() {
            var $child = $(this.options.html);
            $child.appendTo(this.element);

            this.childFilters.push($child);
            if (this.eventMap.addChild) {
                this.eventMap.addChild($child);
            }
            this.addEventsToChild($child);
            this.toggleDeleteSelector();

            return $child;
        },

        doRemoveLastChild: function() {
            var childFilters = this.childFilters,
                child;

            if (childFilters.length > 0) {
                // Reset any
                child = childFilters.pop();
                this.cachedFilters = this.getFilters();
                if (this.eventMap.childChanged) {
                    this.eventMap.childChanged(child);
                }
                if (this.eventMap.removeChild) {
                    this.eventMap.removeChild(child);
                }
                this.element.children().last().remove();
            }
            this.toggleDeleteSelector();
        },

        addChild: function(closure) {
            this.eventMap.addChild = closure;
            return this;
        },

        removeChild: function(closure) {
            this.eventMap.removeChild = closure;
            return this;
        },

        /**
         * Sets the childChanged callback method. This event occurs when a child
         * element has changed its value and a re-filter is needed.
         * @param  {[type]} closure [description]
         * @return {[type]}         [description]
         */
        childChanged: function(closure) {
            this.eventMap.childChanged = closure;
            return this;
        },

        /**
         * Attaches CodePeg.StatFilter to an element
         * 
         * @param  {Object} element The element or selector to attach to
         * @return void
         */
        attach: function(element) {
            this.detach();
            this.element = element;
            if (!(this.element && (this.element instanceof jQuery))) {
                throw new Error("Invalid StatFilter element.  For now, only jQuery objects are supported.");
            }
            if (this.element.StatFilter) {
                throw new Error("StatFilter already attached.");
            }
            this.element.StatFilter = true;
            this.element.empty(); // Can't have child elements initially
        },

        /**
         * Detaches from an element if possible.
         * 
         * @return {Object|null} Returns the object that was detached, else null
         */
        detach: function() {
            var result = null;

            if (this.element) {
                result = this.element;
                delete this.element;
            }

            return result;
        },

        /**
         * Sets up the options by combining the default options, user-supplied
         * options, and element options.
         * 
         * @param {Object} options A dictionary of options that we will use
         */
        setOptions: function(options) {
            var elementOptions;

            this.element.verify = this;
            this.options = $.extend({}, this.defaultOptions, options !== null ? options : {});

            // This must be extended separately because getElementOptions needs
            // to know about any additional selectors
            elementOptions = this.getElementOptions(this.element);
            this.options = $.extend(true, this.options, elementOptions);

            // Perform checks on options that must be included
        },

        /**
         * Retrieves all options contained in the actual DOM element, such as
         * inputs.
         * @param  {Object} element The element to retrieve options from
         * @return {Object}         A dictionary of options that can be combined
         *                          with this.options
         */
        getElementOptions: function(element) {
            var result = {};

            return result;
        },

        /**
         * Filters an item, returning true if this item passes the filter or
         * false if it doesn't.
         * 
         * @param  Object item A MapleStory item whose keys match the value
         *                     parameter in the select element.
         * @return {Boolean}      True if filter matches (show the result), else false
         */
        filter: function(item) {
            var result = true,
                filters = this.cachedFilters,
                itemCopy = $.extend({}, item);

            // Add potentials related to the filters we care about
            if (this.options.includePotentials) {
                itemCopy = this.addPotentials(itemCopy);
            }

            // Check if our itemCopy matches the filters we care about
            return this.matchItem(itemCopy, filters);
        },

        /**
         * Retrieves the stat filters, comparators, and values from the DOM.
         * @return {Object} Key-value pairs where the key is the filter,
         *                            and the value is an array [comparator, value]
         */
        getFilters: function() {
            var result = {},
                childFilters = this.childFilters;

            // This does not use an optimized for loop on purpose. We don't want
            // the filters to be reversed as the end user might think it's a bug.
            for (var i = 0; i < childFilters.length; ++i) {
                var $child = childFilters[i],
                    $select = $child.find('.stat-select'),
                    $comparator = $child.find('.stat-comparator'),
                    $value = $child.find('.stat-value');
                result[$select.val()] = [$comparator.val(), $value.val()];
            }

            return result;
        },

        /**
         * Returns true if the item passes the filters, else false.
         * 
         * @param  {Object} item     An object containing properties whose names
         *                           should match up with filters. An item is not
         *                           guaranteed to contain all properties in
         *                           filters. In such an event, it is to be
         *                           rejected.
         * @param  {Object} filters  An object whose key is the stat select, and
         *                           whose value is an array of [comparator, value]
         * @return {Boolean}         True if the item matches the filters (passes),
         *                           else false.
         */
        matchItem: function(item, filters) {
            var result = true;

            for (var key in filters) {
                var filter = filters[key],
                    comparator = filter[0],
                    value = filter[1] === '' ? 0 : parseInt(filter[1]),
                    hasProperty = item.hasOwnProperty(key);

                if (key === '') {
                    continue; // nothing to do
                }
                result = value === 0;
                if (hasProperty) {
                    switch (comparator) {
                        case '>=':
                            result = parseInt(item[key]) >= value;
                            break;
                        case '<=':
                            result = parseInt(item[key]) <= value;
                            break;
                        case '==':
                            result = parseInt(item[key]) == value;
                            break;
                        default:
                            result = false;
                            console.warn('Impossible value for matchItem comparator: ' + comparator);
                            break;
                    }
                }
                if (!result) {
                    break;
                }
            }

            return result;
        },

        /**
         * Adds potentials from this.options.potentials and 
         * this.options.bonusPotentials to item and returns it.
         * 
         * @param {Object} item [description]
         */
        addPotentials: function(item) {
            var potentials = $.merge([], this.options.potentials);

            $.merge(potentials, this.options.bonusPotentials);

            // Add potentials
            for (var i = potentials.length - 1; i >= 0; --i) {
                var potential = potentials[i];
                if (item.hasOwnProperty(potential)) {
                    item = this.addPotential(item, item[potential]);
                }
            }

            return item;
        },

        addPotential: function(item, potential) {
            // Attempt to match the RegEx for one of the stats we care about
            var filters = this.options.filters;
            for (var key in filters) {
                if (filters.hasOwnProperty(key)) {
                    var filter = filters[key];
                    if (filter.length > 2) { // We have a RegEx! Test it!
                        var match = filter[1].exec(potential);
                        if (match) {
                            if (!item.hasOwnProperty(key)) {
                                item[key] = 0;
                            }
                            item[key] = parseInt(item[key]) + parseInt(match[filter[2]]);
                            return item;
                        }
                    }
                }
            }
            // console.warn('Cannot find match for: ' + potential);

            return item;
        },

        /**
         * Serializes the stat filter object.  Only serializes filters, their
         * comparators, and their values.
         * 
         * @return {[type]} [description]
         */
        serialize: function() {
            return this.getFilters();
        },

        /**
         * Loads the stat filter from a serialized object containing an object of
         * filters.
         * 
         * @param  {[type]} token [description]
         * @return {[type]}       [description]
         */
        unserialize: function(token) {
            for (var key in token) {
                var comparator = token[key][0],
                    value = token[key][1],
                    $child = this.doAddChild(),
                    $select = $child.find('.stat-select'),
                    $comparator = $child.find('.stat-comparator'),
                    $value = $child.find('.stat-value');
                $select.val(key);
                $comparator.val(comparator);
                $value.val(value);
            }
            this.cachedFilters = this.getFilters();
        },
    };

    // Restore the constructor
    Object.defineProperty(CodePeg.StatFilter.prototype, "constructor", {
        enumerable: false,
        value: CodePeg.StatFilter
    });
})(jQuery);