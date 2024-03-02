import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full ">
      <AccordionItem value="item-1" className="">
        <AccordionTrigger><span className="font-bold">Resturants</span></AccordionTrigger>
        <AccordionContent>
         Al-Baik 
        </AccordionContent>
        <AccordionContent>
          Altazeg 
        </AccordionContent>
        <AccordionContent>
          Burger King
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger><span className="font-bold">Hospitals</span></AccordionTrigger>
        <AccordionContent>
         Saudi-Ahli-Hospitals
        </AccordionContent>
        <AccordionContent>
          Alsaady Hospital
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger><span className="font-bold">Shopping Centers</span></AccordionTrigger>
        <AccordionContent>
         Alsaif Gallery
        </AccordionContent>
        <AccordionContent>
         Hyper-Banda
        </AccordionContent>
        <AccordionContent>
       Competitive Price
        </AccordionContent>
        <AccordionContent>
         A Mart
        </AccordionContent>
        <AccordionContent>
         eXtra Stores
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger><span className="font-bold">Historical Places</span></AccordionTrigger>
        <AccordionContent>
         Al-Tahrir Square
        </AccordionContent>
        <AccordionContent>
         Al -Tanaiem Mosque
        </AccordionContent>
        <AccordionContent>
      Heraa Ghar
        </AccordionContent>
        <AccordionContent>
         Mealla Square
        </AccordionContent>
        <AccordionContent>
         eXtra Stores
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger><span className="font-bold">Resturants</span></AccordionTrigger>
        <AccordionContent>
         Al-Baik 
        </AccordionContent>
        <AccordionContent>
          Altazeg 
        </AccordionContent>
        <AccordionContent>
          Burger King
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger><span className="font-bold">Hospitals</span></AccordionTrigger>
        <AccordionContent>
         Saudi-Ahli-Hospitals
        </AccordionContent>
        <AccordionContent>
          Alsaady Hospital
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
