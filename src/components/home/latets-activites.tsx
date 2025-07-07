import { UnorderedListOutlined } from "@ant-design/icons";
import { Card, List } from "antd";
import React from "react";
import { Text } from "../text";
import LatestActivitiesSkeleton from "../skeleton/latest-activities";
import { useList } from '@refinedev/core'
import { DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY, DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY } from "@/graphql/querires";

const LatestActivites = () => {

  const { data: audit, isLoading: isLoadingAudit, isError, error } = useList({
    resource: 'audits',
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
    }
  })

  const dealIds = audit?.data?.map((audit) => audit?.targetId);

  const { data: deals, isLoading: isLoadingDeals } = useList ({
    resource: 'deals',
    queryOptions: { enabled: !!dealIds?.length },
    pagination: {
      mode: 'off'
    },
    filters: [{field: 'id', operator: 'in', value: dealIds }],
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY
    }
  })

  if(isError) {

  }

  const isLoading = isLoadingAudit || isLoadingDeals;


  return (
    <Card
      headStyle={{ padding: "16px" }}
      bodyStyle={{ padding: "0 1rem" }}
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <UnorderedListOutlined />
          <Text size="sm" style={{ marginLeft: "0.5rem" }}>
            Latest Activites
          </Text>
        </div>
      }
    >
        {isLoading ? (
            <List
                itemLayout="horizontal"
                dataSource={Array.from({ length: 5}).map((_, i) => ({ id:i}))}

                renderItem={(_, index) => (
                  <LatestActivitiesSkeleton key={index} />
                )}
            />
        ) : (
            <List 
              itemLayout='horizontal'
              dataSource={audit?.data}
              renderItem={(item) => {
                const deal = deals?.data.find((deal) => deal.id === item.targetId) || undefined;
              
              return (
                <List.Item>
                  <List.Item.Meta>
                    
                  </List.Item.Meta>
                </List.Item>
              )
              }}

              
            />
        )}

    </Card>
  );
};

export default LatestActivites;
