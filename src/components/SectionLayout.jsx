import { Pagination} from "flowbite-react";
import React, { useEffect, useState } from "react";

function SectionLayout(props) {
  

  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-8 lg:px-12">

          {props.children}

      </div>
    </section>
  );
}

export default SectionLayout;
