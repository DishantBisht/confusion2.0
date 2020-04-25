import * as ActionTypes from './ActionTypes';
import {COMMENTS} from '../shared/comments.js';

export const Comments = (state = COMMENTS, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
        var comment = action.payload;
        comment.id = state.comments.length;
        comment.date = new Date().toISOString();
        return { ...state, comments: state.comments.concat(comment)};

    default:
      return state;
  }
};