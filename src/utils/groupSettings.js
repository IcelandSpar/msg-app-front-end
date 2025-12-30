
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
  setIsConfirmLeaveOpen(false);
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

export {
  handleOptsModal,
  handleOpenConfirmModal,
  handleOpenConfirmDeleteModal,
  handleNevermindBtn,
  handleLeaveGroupBtn,
};
