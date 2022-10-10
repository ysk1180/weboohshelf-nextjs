import Modal from 'react-modal'

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
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setModalHash("")}
      style={customStyles}
    >
      <div className="text-red-500">
        Hey
      </div>
      <img src={`https://webookshelf-${process.env.NODE_ENV}.s3-ap-northeast-1.amazonaws.com/images/${modalHash}.png`} />
      <a
        className="text-blue-500"
        href={`https://twitter.com/share?text=%23Web本棚&url=https://webookshelf.herokuapp.com?h=${modalHash}`}
        target="_blank"
      >
        Twitterシェア
      </a>
    </Modal>
  )
}

Modal.setAppElement('body');

export default RecommendShareModal