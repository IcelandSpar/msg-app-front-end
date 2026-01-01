
const handleOptsModal = (e, setIsOptsModalOpen) => {
  e.preventDefault();
  setIsOptsModalOpen((prev) => !prev);
};

const handleOpenConfirmModal = (e, setIsOptsOpen, setIsConfirmLeaveOpen) => {
  e.preventDefault();
  // setIsOptsOpen(false);
  setIsConfirmLeaveOpen(true);
};

const handleOpenConfirmDeleteModal = (e, setIsConfirmDeleteGroupModalOpen) => {
  e.preventDefault();
  setIsConfirmDeleteGroupModalOpen((prev) => !prev);
};

const handleNevermindBtn = (e, setIsOptsOpen, setIsConfirmLeaveOpen) => {
  e.preventDefault();
  setIsOptsOpen(false);
  if(!setIsConfirmLeaveOpen) {
    null
  } else {
    setIsConfirmLeaveOpen(false);

  }
};

const handleLeaveGroupBtn = (
  e,
  profile,
  groupInfo,
  setIsOptsOpen,
  setIsConfirmLeaveOpen,
  setMemberGroups,
) => {
  e.preventDefault();

  const token = sessionStorage.getItem("msgAppToken");
  if (token && profile) {

    fetch(
      `${import.meta.env.VITE_FETCH_BASE_URL}/group-actions/leave-group/${
        profile.id
      }/${(groupInfo.group.id)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setIsOptsOpen(false);
          setIsConfirmLeaveOpen(false);

          if (setMemberGroups == null) {
            window.location.href = '/channel/myhome';
          } else {
            setMemberGroups((prev) =>
              prev.filter((item) => item.groupId != res.removedMember.groupId)
            );
          }
        }
      });
  }
};

  const handleDeleteGroup = (e, profileId, groupInfo, setMemberGroups, setIsConfirmDeleteGroupModalOpen) => {
    e.preventDefault();
    const token = sessionStorage.getItem('msgAppToken');
    if(token) {
      fetch(`${import.meta.env.VITE_FETCH_BASE_URL}/group-actions/delete-group/${profileId}/${groupInfo.group.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        method: "DELETE",
      })
      .then((res) => res.json())
      .then((res) => {
        if(res.success) {
          if (setMemberGroups == null) {
            window.location.href = '/channel/myhome';
          } else {
            setMemberGroups(res.memberGroups);
            handleOpenConfirmDeleteModal(e, setIsConfirmDeleteGroupModalOpen);

          }
        } else if(!res.success) {
          console.log(res.message);
          handleOpenConfirmDeleteModal(e, setIsConfirmDeleteGroupModalOpen);
        }
      })
      .catch((err) => console.error(err));
    }

  };

export {
  handleOptsModal,
  handleOpenConfirmModal,
  handleOpenConfirmDeleteModal,
  handleNevermindBtn,
  handleLeaveGroupBtn,
  handleDeleteGroup,
};
