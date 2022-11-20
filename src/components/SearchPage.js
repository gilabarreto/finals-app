import React, { useEffect } from "react";

export default function SearchPage(props) {

  useEffect(() => {
    console.log("search page", props)
  }, [])

  return (
    <h1>Test {props.results.length}</h1>
  )

}