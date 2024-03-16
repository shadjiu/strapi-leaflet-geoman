import { FC, PropsWithChildren, useState } from "react";
import {
  Typography,
  Button,
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Flex,
  // @ts-ignore
} from "@strapi/design-system";
import { Expand, Collapse } from "@strapi/icons";

const ModalWrapper: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <Flex
        justifyContent="flex-end"
        style={{ margin: "20px 0", width: "100%" }}
      >
        <Button
          onClick={() => setIsVisible((prev) => !prev)}
          variant="tertiary"
          endIcon={<Expand />}
        >
          Expand
        </Button>
      </Flex>

      {!isVisible && children}
      {isVisible && (
        <ModalLayout
          style={{ width: "90vw" }}
          onClose={() => setIsVisible((prev) => !prev)}
          labelledBy="title"
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              Add/Edit map data
            </Typography>
          </ModalHeader>
          <ModalBody>{children}</ModalBody>
          <ModalFooter
            endActions={
              <Button
                variant="tertiary"
                endIcon={<Collapse />}
                onClick={() => setIsVisible((prev) => !prev)}
              >
                Collapse
              </Button>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default ModalWrapper;
