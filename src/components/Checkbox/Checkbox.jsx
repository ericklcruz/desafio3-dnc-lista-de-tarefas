import React from 'react';
import './checkbox.scss';

const Checkbox = () => {
    return (
        <div class="checkbox-wrapper-52">
            <label for="todo-52" class="item">
                <input type="checkbox" id="todo-52" class="hidden" />
                <label for="todo-52" class="cbx">
                    <svg width="14px" height="12px" viewBox="0 0 14 12">
                        <polyline points="1 7.6 5 11 13 1"></polyline>
                    </svg>
                </label>
                <label for="todo-52" class="cbx-lbl">To-do</label>
            </label>
        </div>
    );
};

export default Checkbox;