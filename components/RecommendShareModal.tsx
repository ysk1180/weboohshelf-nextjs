import Modal from 'react-modal'
import ShareLinks from './ShareLinks';

type Props = {
  isOpen: boolean
  modalHash: string
  setModalHash: any
}

const RecommendShareModal = ({isOpen, modalHash, setModalHash}: Props): JSX.Element => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setModalHash("")}
      style={customStyles}
    >
      <div className="max-w-lg">
        {/* TODO: モーダルをとじる×ボタンほしい */}
        <div className="text-black mb-4 text-center text-lg">
          本棚を作成しました 🎉
        </div>
        <img src={`https://webookshelf-${process.env.NODE_ENV}.s3-ap-northeast-1.amazonaws.com/images/${modalHash}.png`} />
        <div className="mt-5 mb-2">
          <ShareLinks hash={modalHash} />
        </div>
      </div>
    </Modal>
  )
}

Modal.setAppElement('body');

export default RecommendShareModal