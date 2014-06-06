
## Overview

Makefiles have a very strange grammar, seemingly because it evolved over time as people ran into new use cases they'd like to support. Maybe some day we can create a better make.

One advantage make has is the ability to do parallel builds.

## Resources

- http://www.gnu.org/software/make/manual/make.html
- http://superuser.com/questions/290695/for-simple-projects-what-do-makefiles-offer-over-plain-bash-scripts
- http://stackoverflow.com/questions/3798562/why-use-make-over-a-shell-script

Commas and unmatched parentheses or braces cannot appear in the text of an argument as written; leading spaces cannot appear in the text of the first argument as written. These characters can be put into the argument value by variable substitution. First define variables comma and space whose values are isolated comma and space characters, then substitute these variables where such characters are wanted, like this:

     comma:= ,
     empty:=
     space:= $(empty) $(empty)
     foo:= a b c
     bar:= $(subst $(space),$(comma),$(foo))
     # bar is now `a,b,c'.

    $(patsubst %.c,%.o,$(wildcard *.c))
    $(wildcard *.c)
    objects := $(patsubst %.c,%.o,$(wildcard *.c))
    mk_temp.dll: mk_temp.c
        $(CC) -shared -o $ $< -lgnumake-1
    all:
             @echo Temporary file: $(mk-temp tmpfile.)

To ignore errors in a recipe line, write a ‘-’ at the beginning of the line's text (after the initial tab). The ‘-’ is discarded before the line is passed to the shell for execution.

    clean:
        -rm -f *.o

     files = foo.elc bar.o lose.o
     
     $(filter %.o,$(files)): %.o: %.c
             $(CC) -c $(CFLAGS) $< -o $@
     $(filter %.elc,$(files)): %.elc: %.el
             emacs -f batch-byte-compile $<

     ifeq (0,${MAKELEVEL})
     whoami    := $(shell whoami)
     host-type := $(shell arch)
     MAKE := ${MAKE} host-type=${host-type} whoami=${whoami}
     endif
    ${subdirs}:
        ${MAKE} -C $@ all