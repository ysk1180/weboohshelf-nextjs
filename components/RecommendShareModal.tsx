import Modal from 'react-modal'
import ShareLinks from './ShareLinks';

import { noIdBook } from 'types/expansion_book'

type Props = {
  isOpen: boolean
  modalHash: string
  setModalHash: any
  selectedBooks?: noIdBook[]
}

const RecommendShareModal = ({isOpen, modalHash, setModalHash, selectedBooks}: Props): JSX.Element => {
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
      <div className="max-w-lg relative">
        <button
          onClick={() => setModalHash("")}
          className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="text-black mb-4 text-center text-lg pt-8">
          本棚を作成しました 🎉
        </div>
        <img src={`https://webookshelf-${process.env.NODE_ENV}.s3-ap-northeast-1.amazonaws.com/images/${modalHash}.png`} />
        <div className="mt-5 mb-2">
          <ShareLinks hash={modalHash} selectedBooks={selectedBooks} />
        </div>
      </div>
    </Modal>
  )
}

Modal.setAppElement('body');

export default RecommendShareModal