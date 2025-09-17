import styles from '../../styles/SearchGroupModal.module.css';

const SearchGroupModal = ({handleSearchGroupModal}) => {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.searchGroupModalCont}>
        <form>
        <div className={styles.searchInputButtonCont}>
          <div>
            <label htmlFor="">Search groups by name:</label>
            <input type="text" />
          </div>
          <button type='button'>Search</button>
        </div>



          <button onClick={handleSearchGroupModal} type='button'>Exit</button>
        </form>
      </div>
    </div>
  )
};

export default SearchGroupModal;