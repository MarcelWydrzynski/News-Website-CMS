import React from "react";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";

type Article = {
  id: number;
  author: string;
  category: string;
  title: string;
  description: string;
  lead: string;
  image: string;
  content: string;
};

type ArticleModalProps = {
  openModal: boolean;
  setOpenModal: (arg0: boolean) => void;
  article: null | Article;
};

const ArticleModal = ({ openModal, setOpenModal, article }: ArticleModalProps) => {
  return (
    <>
      <Modal dismissible show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="flex flex-col gap-2 flex-grow">
            <h5 className="text-sm font-bold tracking-tight text-gray-900 dark:text-white">
              <div className="flex gap-1 flex-wrap">
                <span className="font-thin">By:</span> {article?.author}
                <span className="font-thin ml-2">Category:</span> {article?.category}
              </div>
            </h5>
            <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{article?.title}</h4>
            <p className="font-normal text-gray-700 dark:text-gray-400">{article?.description}</p>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ArticleModal;
