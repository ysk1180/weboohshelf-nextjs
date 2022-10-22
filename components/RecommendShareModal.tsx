import Modal from 'react-modal'
import { CopyToClipboard } from 'react-copy-to-clipboard';

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
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setModalHash("")}
      style={customStyles}
    >
      <div className="max-w-lg">
        <div className="text-black mb-4 text-center text-lg">
          本棚を作成しました 🎉
        </div>
        <img src={`https://webookshelf-${process.env.NODE_ENV}.s3-ap-northeast-1.amazonaws.com/images/${modalHash}.png`} />
        <div className="flex">
          <div className="mx-auto mt-6 mb-2 flex gap-2 md:gap-5">
            <a
              className="flex bg-sky-500 py-3 px-3 rounded hover:opacity-80 cursor-pointer"
              href={`https://twitter.com/share?text=%23Web本棚&url=https://webookshelf.herokuapp.com?h=${modalHash}`}
              target="_blank"
            >
              <span className="my-auto">
                Twitterシェア
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 ml-1 my-auto">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <div className="bg-gray-500 rounded flex">
              <div className="my-auto p-2 hover:opacity-80 cursor-pointer">
                <CopyToClipboard text="aaa">
                  <span>
                    シェア用のURLをコピー
                  </span>
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}

Modal.setAppElement('body');

export default RecommendShareModal