import React, { FC, useCallback, useEffect, useState } from "react";
import { post } from "@site/src/api";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { translate } from "@docusaurus/Translate";

interface IArticleMetaProps {
  updatedAt: string | null;
  id: number;
}

export const ArticleMeta: FC<IArticleMetaProps> = (props) => {
  const { updatedAt, id } = props;
  const [viewCount, setViewCount] = useState(0);
  // translate({
  //   id: "theme.docs.paginator.navAriaLabel",
  //   message: "Docs pages",
  //   description: "The ARIA label for the docs pagination"
  // });
  const {
    siteConfig: { customFields: { apiProxyUrl } }
  } = useDocusaurusContext();

  useEffect(() => {
    if (!apiProxyUrl || !id) return;
    // https://api.devops.longbridge-inc.com/independent/home/api-studio/inside/apis/api/233/detail/5836?spaceKey=LMsAkPRfb875391c87089bec29fd47a8c28481845f4ec47
    post(`${apiProxyUrl}/social/wiki/detail`, { id }).then((resp) => {
      const { data } = resp;
      if (data?.pv) {
        setViewCount(data.pv);
      }
    });
  }, [apiProxyUrl, id]);

  const onClickCopySection = useCallback(() => {

  }, []);

  useEffect(() => {
    // @ts-ignore
    const clipboard = new ClipboardJS("#copy_trigger");
    clipboard.on("success", function(e) {
      e.clearSelection();
    });

    clipboard.on("error", function(e) {
      console.error("Action:", e.action);
      console.error("Trigger:", e.trigger);
    });
  }, []);

  return (
    <div className={"article-meta flex items-center justify-between text-sm"}>
      <div className="info">
        {!!viewCount &&
          <span className={"view-count"}>{viewCount} 人学过 .</span>
        }
        <span className={"updated-at"}> {translate({
          id: "article.meta.updated_at"
        }, { datetime: updatedAt })}</span>
      </div>
      <div className="actions">
        {/*<div className="copy-section" id={"copy_trigger"} onClick={onClickCopySection}>*/}
        {/*  <div className="copy-link" />*/}
        {/*</div>*/}
      </div>
    </div>
  );
};
