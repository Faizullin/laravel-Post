import apiPost from '@/services/apiPost';
import { useState,useEffect } from 'react';
import CommentCreateForm from './CommentCreateForm';
import CommentEditModalForm from './CommentEditModalForm';
import CommentItem from './CommentItem';
import CommentReplyModalForm from './CommentReplyModalForm';
import Pagination from './Pagination';
import { useModal } from '@ebay/nice-modal-react';
import { DeleteConfirmModal } from '../Dialog/DeleteConfirmModal';

export default function CommentList({post}){
    const [createReplyParentId,setCreateReplyParentId] = useState(null);
    const [editItem,setEditItem] = useState({});
    const [openEditModal,setOpenEditModal] = useState(false);
    const modal = useModal(DeleteConfirmModal);
    const [openCreateReplyModal,setOpenCreateReplyModal] = useState(false);

    const [comments,setComments] = useState({
        data:[]
    });

    const getComments = (page=1) => {
        return apiPost.get(route (`api.comment.index`),{params:{post_id:post.id,page,}}).then(response => {
            setComments(response.data || {data:[]});
        });
    }
    const handleReply =(e,parent_id) => {
		e.preventDefault();
        setCreateReplyParentId(parent_id);
        setOpenCreateReplyModal(true);
	}
    const handleEdit = (comment) => {
        setEditItem({...comment})
        setOpenEditModal(true)
    }

    const handleDelete = (confirmData) => {
        modal.show({ onConfirm: handleDeleteConfirm,confirmData, });
    }

    const handleDeleteConfirm = (comment) => {
        apiPost.delete(route(`api.comment.destroy`,comment)).then(response => {
            getComments();
        }).then(() => {
            modal.hide()
        })

    }
    useEffect(function(){
        getComments();
    },[]);

    return (
        <div className="comments">

            <h4 className="comments-count">{post.comments_count} Comments</h4>

            { comments.data.map((comment,index) => (
                <CommentItem comment={comment}
                    key={`comment-${comment.id}`}
                    openCreateReplyModal={openCreateReplyModal}
                    setOpenCreateReplyModal={setOpenCreateReplyModal}
                    onReply={handleReply}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    />
            )) }
            <div className={`mb-3 ${!(post.comments_count>0) ? "hidden" : "" }`}>
                <Pagination items={comments} onPaginate={getComments}/>
            </div>

            <CommentCreateForm
                reload={getComments}/>
            <CommentReplyModalForm
                createReplyParentId={createReplyParentId}
                reload={getComments}
                show={openCreateReplyModal}
                setShow={setOpenCreateReplyModal}
                />
            <CommentEditModalForm
                item={editItem}
                reload={getComments}
                show={openEditModal}
                setShow={setOpenEditModal}
                />

        </div>
    )
}
