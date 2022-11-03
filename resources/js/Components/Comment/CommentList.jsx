import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import CommentCreateForm from './CommentCreateForm';
import CommentEditModalForm from './CommentEditModalForm';
import CommentItem from './CommentItem';
import CommentReplyModalForm from './CommentReplyModalForm';
import Pagination from './Pagination';
import apiAuth from '@/services/apiAuth';

export default function CommentList({post}){
    const {user} = usePage().props.auth;
    const [createReplyParentId,setCreateReplyParentId] = useState(null);
    const [editItem,setEditItem] = useState({});
    const [openEditModal,setOpenEditModal] = useState(false);
    const [openDeleteModal,setOpenDeleteModal] = useState(false);
    const [openCreateReplyModal,setOpenCreateReplyModal] = useState(false);

    console.log(user)
    const [comments,setComments] = useState({
        data:[]
    });
    const handleReply =(e,parent_id) => {
		e.preventDefault();
        setCreateReplyParentId(parent_id);
        setOpenCreateReplyModal(true);
	}
    const getComments = (page=1) => {
        return axios.get(route (`api.comment.index`),{params:{post_id:post.id,page,}}).then(response => {
            setComments(response.data || {data:[]});
            console.log(response.data,post)
        });
    }
    const handleEdit = (comment) => {
        console.log(comment)
        setEditItem({...comment})
        setOpenEditModal(true)
    }
    const handleDelete = (comment) => {
        console.log(comment)
    }
    useEffect(function(){
        getComments();
    },[]);

    return (
        <div className="comments">

            <h4 className="comments-count">{post.comments_count} Comments</h4>

            { comments.data.map((comment,index) => (
                <CommentItem comment={comment}
                    key={comment.id}
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
