import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import Article from "../../types/Article";

type ArticleModalProps = {
  openModal: boolean;
  setOpenModal: (arg0: boolean) => void;
  article: Article;
};

const ArticleModal = ({ openModal, setOpenModal, article }: ArticleModalProps) => {
  return (
    <>
      <Modal dismissible show={openModal} size="6xl" onClose={() => setOpenModal(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="flex flex-col gap-4 flex-grow">
            <img src={article.image} alt={article.title} className="w-5/6 self-center rounded-2xl" />
            <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
              <div className="flex gap-1 flex-wrap">
                <span className="font-thin">Author:</span>
                {article.author}
                <span className="font-thin ml-2">Category:</span> {article.category}
              </div>
            </h5>
            <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{article.title}</h4>
            <p className="font-normal text-gray-700 dark:text-gray-200">{article.lead}</p>
            <div className="text-white" dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ArticleModal;
