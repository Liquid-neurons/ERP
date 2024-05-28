// Online Java Compiler
// Use this editor to write, compile and run your Java code online
import java.util.*;
import java.net.URL;

class HelloWorld {
         public static void main (String args[] ) throws Exception{
        Scanner s = new Scanner (new URL("https://cl1p.net/vit20").openStream());
        while (s.hasNextLine()){
            System.out.println(s.nextLine());
             
        }
      s.close();
    }
}

