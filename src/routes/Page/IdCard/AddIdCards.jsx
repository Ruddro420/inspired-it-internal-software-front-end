
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const AddIdCards = ({generate}) => {
    return (
        <div style={{ overflow: "hidden" }}>
        <h1 className="text-2xl font-bold mb-3">ID Card Generate</h1>
        <form className="border p-5 rounded">
          <div className="mt-3">
            <label htmlFor=" ID Card" className="md:col-span-1">
             ID Number
              <Input type="number" id="IdNumber" placeholder="ID Number"required/>
            </label>
            
          </div>
          <Button onClick={generate} size="sm" className="h-8 gap-1 mt-5">
          Generate Id Card
        </Button>
        </form>
      </div> 
    );
};

export default AddIdCards;