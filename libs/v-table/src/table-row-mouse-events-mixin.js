'use strict';

Object.defineProperty(exports, "__esModule", {
            value: true
});
exports.default = {
            data: function data() {

                        return {

                                    hoverRowIndex: -1,
                                    clickRowIndex: -1
                        };
            },


            methods: {
                        handleMouseEnter: function handleMouseEnter(rowIndex) {

                                    if (this.rowHoverColor && this.rowHoverColor.length > 0) {

                                                this.hoverRowIndex = rowIndex;
                                    }

                                    this.rowMouseEnter && this.rowMouseEnter(rowIndex);
                        },
                        handleMouseOut: function handleMouseOut(rowIndex) {

                                    if (this.rowHoverColor && this.rowHoverColor.length > 0) {

                                                this.hoverRowIndex = -1;
                                    }

                                    this.rowMouseLeave && this.rowMouseLeave(rowIndex);
                        },
                        keydownHandle: function keydownHandle(rowIndex, previousItem, nextItem, e) {
                                    if (e.keyCode === 38 && e.currentTarget.previousElementSibling) {
                                                e.preventDefault();
                                                e.cancelBubble = true;
                                                e.currentTarget.previousElementSibling.focus();
                                                this.rowCellClick(rowIndex - 1, previousItem);
                                    } else if (e.keyCode === 40 && e.currentTarget.nextElementSibling) {
                                                e.preventDefault();
                                                e.cancelBubble = true;
                                                e.currentTarget.nextElementSibling.focus();
                                                this.rowCellClick(rowIndex + 1, nextItem);
                                    }
                        },
                        titleCellClick: function titleCellClick(field, title) {

                                    this.titleClick && this.titleClick(title, field);
                        },
                        titleCellDblClick: function titleCellDblClick(field, title) {

                                    this.titleDblclick && this.titleDblclick(title, field);
                        },
                        rowCellClick: function rowCellClick(rowIndex, rowData, column) {
                                    if (this.rowClickColor && this.rowClickColor.length > 0) {

                                                this.clickRowIndex = rowIndex;
                                    }

                                    this.rowClick && this.rowClick(rowIndex, rowData, column);
                        },
                        rowCellDbClick: function rowCellDbClick(rowIndex, rowData, column) {

                                    this.rowDblclick && this.rowDblclick(rowIndex, rowData, column);
                        },
                        getHighPriorityBgColor: function getHighPriorityBgColor(rowIndex) {

                                    var result = '';

                                    if (this.clickRowIndex === rowIndex) {

                                                result = this.rowClickColor;
                                    } else if (this.hoverRowIndex === rowIndex) {

                                                result = this.rowHoverColor;
                                    }

                                    if (result.length <= 0) {

                                                if (this.evenBgColor && this.evenBgColor.length > 0 || this.oddBgColor && this.oddBgColor.length > 0) {

                                                            result = (rowIndex + 1) % 2 === 0 ? this.evenBgColor : this.oddBgColor;
                                                }
                                    }

                                    if (result.length <= 0) {

                                                result = this.tableBgColor;
                                    }

                                    return result;
                        },
                        setRowBgColor: function setRowBgColor(newVal, oldVal, color, action) {
                                    var _this = this;

                                    var el = this.$el;

                                    if (!el) {
                                                return false;
                                    }

                                    var rowsCollection = [],
                                        oldRow = void 0,
                                        newRow = void 0;

                                    if (this.hasFrozenColumn) {

                                                rowsCollection.push(el.querySelectorAll('.v-table-leftview .v-table-row'));
                                    }

                                    rowsCollection.push(el.querySelectorAll('.v-table-rightview .v-table-row'));

                                    rowsCollection.forEach(function (rows) {

                                                oldRow = rows[oldVal];
                                                newRow = rows[newVal];

                                                if (oldRow) {

                                                            oldRow.style.backgroundColor = _this.getHighPriorityBgColor(oldVal);
                                                            if (action === 'click') {
                                                                        oldRow.style.color = '#000000';
                                                            }
                                                }

                                                if (newRow) {
                                                            if (action === 'hover' && _this.hoverRowIndex === _this.clickRowIndex) {
                                                                        return false;
                                                            }
                                                            newRow.style.backgroundColor = color;
                                                            if (action === 'click') {
                                                                        newRow.style.color = '#ffffff';
                                                            }
                                                }
                                    });
                        },
                        clearCurrentRow: function clearCurrentRow() {

                                    this.clickRowIndex = -1;
                        }
            },

            watch: {

                        'hoverRowIndex': function hoverRowIndex(newVal, oldVal) {

                                    this.setRowBgColor(newVal, oldVal, this.rowHoverColor, 'hover');
                        },

                        'clickRowIndex': function clickRowIndex(newVal, oldVal) {

                                    this.setRowBgColor(newVal, oldVal, this.rowClickColor, 'click');
                        }
            }
};