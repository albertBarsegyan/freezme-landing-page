import React from "react";

export interface ComponentWithChildren {
  children: React.ReactNode;
}

export interface ComponentWithChildrenCallback<T> {
  children: (data: T) => void;
}
